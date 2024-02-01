import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AboutComponent } from "./about.component";
import { AboutService } from '../../services/about.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AboutComponent", () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let aboutService: AboutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [{ provide: AboutService }],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    aboutService = TestBed.inject(AboutService);
  });

  
  it('should create About Component', () => {
    expect(component).toBeTruthy();
  });

  // it('should get the about information from service', () => {
  //   const aboutService = fixture.debugElement.injector.get(AboutService);
  //   fixture.detectChanges();

  //   expect(aboutService.getAboutMeInfo().subscribe()).toEqual(component.about);
  // });
})