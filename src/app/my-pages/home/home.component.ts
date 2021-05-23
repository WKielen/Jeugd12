import { Component, OnInit } from '@angular/core';
import { ParamService } from 'src/app/services/param.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppError } from 'src/app/shared/error-handling/app-error';
import * as moment from 'moment';
import { AgendaService, IAgendaItem } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { LedenItem, LedenService } from 'src/app/services/leden.service';
import { ITrainingstijdItem, TrainingstijdService } from 'src/app/services/trainingstijd.service';
import { ISignoffRecord, TrainingService } from 'src/app/services/training.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageDialogComponent } from 'src/app/shared/components/dialog.message.component';
import { WordpressService } from 'src/app/services/wppost.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IWebsiteText } from 'src/app/shared/components/announcement.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    private wordpressService: WordpressService,
    public authServer: AuthService,
    public trainingService: TrainingService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
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
  mycolor = "#0d47a1";

  /***************************************************************************************************
  / Lees het record uit de Param tabel
  /***************************************************************************************************/
  private readWebsiteTexts(): void {
    this.registerSubscription(
      this.paramService.readParamData$("getinstantwebsitetext")
        .subscribe({
          next: (data) => {
            let result = data as string;
            this.announcements = (JSON.parse(result) as IWebsiteText[]).filter(this.isValidAnnouncement('JE'));
            this.readWordpress();
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    )
  }

  /***************************************************************************************************
  / Lees het record uit de Param tabel
  /***************************************************************************************************/
  private readAgenda(): void {
    this.registerSubscription(
      this.agendaService.getAllFromNow$()
        .subscribe({
          next: (data) => {
            this.agenda = (data as Array<IAgendaItem>).filter(this.isValidAgenda('JE'));
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    )
  }

  /***************************************************************************************************
  / Lees het record uit de Leden tabel
  /***************************************************************************************************/
  private readLid(): void {
    this.registerSubscription(
      this.ledenService.readLid$(this.authServer.LidNr)
        .subscribe({
          next: (data) => {
            this.lid = data;
            this.myGroups = this.lid.ExtraA?.split(',') ?? [];
            this.authServer.lid = data;
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    )
  }

  private readTrainingsTijden() {
    this.registerSubscription(
      this.trainingstijdService.getAll$()
        .subscribe({
          next: (data) => {
            this.trainingsGroups = data as Array<ITrainingstijdItem>;
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    )
  }

  private readWordpress() {
    this.registerSubscription(
      this.wordpressService.getLast5$()
        .subscribe({
          next: (data) => {
            let list: Array<any> = data as Array<any>;
            list.forEach(element => {
              let announcement: IWebsiteText = {} as IWebsiteText;
              announcement.Header = element.post_title;
              announcement.ImageUrl = element.imageurl;
              // De HTML variable komt uit wordpress. Er staat nogal wat rommel in. Daarom haal ik hem eerst door de sanitizer.
              // Als je dit niet doet dan gebeurt het in de browser en krijg je een warning. Dit is netter.
              announcement.Text = this.sanitizer.bypassSecurityTrustHtml(element.post_content) as string;
              this.announcements.push(announcement);
            });
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    )
  }


  onClick($event: any) {
    let observables = $event.dates.map((date: string) => this.updateDatum(date, $event.reasontext));

    let source = forkJoin(observables);
    this.registerSubscription(
      source
        .subscribe({
          next: (data) => {
            this.dialog.open(MessageDialogComponent, {
              data: data.join('<br>'),
            });
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    );
  }

  updateDatum(date: string, reasontext: string): Observable<Object> {
    let record: ISignoffRecord = Object();
    record.Date = date;
    record.Reason = reasontext;
    return this.trainingService.signoff$(record).pipe(

      map(function (value: any) {
        return "Je bent afgemeld voor de training van " + date + ". ";;
      }),

      catchError(err => {
        let errorNr = err.originalError.status;
        if (errorNr == "422") {
          return of("Je was al afgemeld voor " + date + ". ")
        }
        return of("Er is een probleem opgetreden. Je afmelding voor " + date + " is niet geregistreerd. ")
      }))
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
