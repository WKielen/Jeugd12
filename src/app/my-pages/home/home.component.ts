import { Component, OnInit } from '@angular/core';
import { IWebsiteText, ParamService } from 'src/app/services/param.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppError } from 'src/app/shared/error-handling/app-error';
import * as moment from 'moment';
import { AgendaService, IAgendaItem } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { LedenItem, LedenService } from 'src/app/services/leden.service';
import { ITrainingstijdItem, TrainingstijdService } from 'src/app/services/trainingstijd.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  private nbrTabs: number = 3;
  public announcements: Array<IWebsiteText> = [];
  public agenda: Array<IAgendaItem> = [];
  public trainingsGroups: Array<ITrainingstijdItem> = [];
  public myGroups: Array<string> = [];
  public role: string = 'JE';

  constructor(
    private paramService: ParamService,
    private agendaService: AgendaService,
    private ledenService: LedenService,
    private trainingstijdService: TrainingstijdService,
    public authServer: AuthService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.readWebsiteTexts();
    this.readAgenda();
    this.readLid();
    this.readTrainingsTijden();
  }

  lid: LedenItem = new LedenItem();
  mycolor="#0d47a1";
  /***************************************************************************************************
  / Lees het record uit de Param tabel
  /***************************************************************************************************/
  private readWebsiteTexts(): void {
    this.registerSubscription(
      this.paramService.readParamData$("getinstantwebsitetext")
        .subscribe(data => {
          let result = data as string;
          this.announcements = (JSON.parse(result) as IWebsiteText[]).filter(this.isValidAnnouncement('JE'));
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
    )
  }

  /***************************************************************************************************
  / Lees het record uit de Param tabel
  /***************************************************************************************************/
  private readAgenda(): void {
    this.registerSubscription(
      this.agendaService.getAllFromNow$()
        .subscribe(data => {
          this.agenda = (data as Array<IAgendaItem>).filter(this.isValidAgenda('JE'));
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
    )
  }


  /***************************************************************************************************
  / Lees het record uit de Leden tabel
  /***************************************************************************************************/
  private readLid(): void {
    this.registerSubscription(
      this.ledenService.readLid$(this.authServer.LidNr)
        .subscribe(data => {
          this.lid = data;
          this.myGroups = this.lid.ExtraA?.split(',') ?? [];
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
    )
  }


  private readTrainingsTijden() {
    this.registerSubscription(
      this.trainingstijdService.getAll$()
        .subscribe(
          data => {
            this.trainingsGroups = data as Array<ITrainingstijdItem>;
          }
        )
    )
  }


  signoff($event: any) {
    console.log('sign off te verzenden', $event);
  }



  /***************************************************************************************************
  / Het filter om de goede agendaItems te selecteren. Dit is de techniek als je params wil meegeven
  /***************************************************************************************************/
  isValidAgenda(role: string) {
    return function (item: IAgendaItem) {
      if (role === 'JE' && item.DoelGroep === "J") return true;
      if (role === 'SE' && item.DoelGroep === "S") return true;
      return false;
    }
  }

  /***************************************************************************************************
  / Het filter om de goede mededelingen te selecteren. Dit is de techniek als je params wil meegeven
  /***************************************************************************************************/
  isValidAnnouncement(role: string) {
    return function (item: IWebsiteText) {
      if (role !== 'JE') return false;

      const startDate: Date = moment(item.StartDate).toDate();
      const endDate: Date = moment(item.EndDate).toDate();
      const now: Date = moment().toDate();
      return (startDate <= now && endDate >= now)
    }
  }

  /***************************************************************************************************
  / Ik heb werkelijk geen idee hoe dit werkt. Eerlijk gestolen van het internet.
  /***************************************************************************************************/
  swipeCoord: any = 0;
  swipeTime: any = 0;
  selectedTab: number = 0;
  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        // console.info(swipe);
        if (swipe === 'next') {
          const isFirst = this.selectedTab === 0;
          if (this.selectedTab < (this.nbrTabs - 1)) {
            this.selectedTab = isFirst ? 1 : this.selectedTab + 1;
          }
          // console.log("Swipe left - INDEX: " + this.selectedTab);
        } else if (swipe === 'previous') {
          const isLast = this.selectedTab === (this.nbrTabs - 2);
          if (this.selectedTab >= 1) {
            this.selectedTab = this.selectedTab - 1;
          }
          // console.log("Swipe right - INDEX: " + this.selectedTab);
        }
        // Do whatever you want with swipe
      }
    }
  }
}
