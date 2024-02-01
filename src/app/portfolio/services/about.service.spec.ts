import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AboutService } from "./about.service";
import { Certification, Education } from '../models/about';

describe("AboutService", () => {
  let service: AboutService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AboutService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should find all skills', () => {

    const expecredUrl = 'assets/json/about/skills.json';

    const expectedSkills: string[] = ['.Net', 'Angular'];

    let actualSkills: string[] | undefined;

    const aboutObservable = service.getSkills();
    aboutObservable.subscribe(skills => {
      actualSkills = skills;
    });

    const request = controller.expectOne( expecredUrl );

    request.flush( expectedSkills );

    expect( actualSkills ).toEqual( expectedSkills );
    expect( '.Net' ).toEqual( expectedSkills[0] );

  });

  it('should find educational information list', () => {

    const expecredUrl = 'assets/json/about/educationList.json';

    const expectedEducationList: Education[] = 
    [
      {
        institution: 'Universidad Popular Del Cesar',
        career: 'Ingeniería de sistemas',
        startDate: new Date('2017'),
        endDate: new Date('2023'),
        city: 'Valledupar, Cesar',
      }
    ]

    let actualEducationList: Education[] | undefined;

    const aboutObservable = service.getEducationList();
    aboutObservable.subscribe(educationalList => {
      actualEducationList = educationalList;
    });

    const request = controller.expectOne( expecredUrl );

    request.flush( expectedEducationList );

    expect( actualEducationList ).toEqual( expectedEducationList );

  });

  it('should find all certifications', () => {

    const expecredUrl = 'assets/json/about/certifications.json';

    const expectedCertifications: Certification[] = 
    [
      {
        name: '',
        expeditionDate: new Date(),
        certifying: '',
        link: ''
      }
    ]

    let actualCertifications: Certification[] | undefined;

    const certificationObservable = service.getCertifications();
    certificationObservable.subscribe(certifications => {
      actualCertifications = certifications;
    });

    const request = controller.expectOne( expecredUrl );

    request.flush( expectedCertifications );

    expect( actualCertifications ).toEqual( expectedCertifications );

  });
});


