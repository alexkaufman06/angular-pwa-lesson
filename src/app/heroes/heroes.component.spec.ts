import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { Hero } from './../hero';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: Element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a create a Hero with an id and name`, () => {
    const hero: Hero = fixture.debugElement.componentInstance.hero;
    expect(hero.id).toEqual(1);
    expect(hero.name).toEqual('Windstorm');
  });

  it('should render the an h2 tag with "WINDSTORM Details" as the text', () => {
    expect(compiled.querySelector('h2').textContent).toEqual('WINDSTORM Details');
  });

  it('should render a div with "id: 1" as the text', () => {
    expect(compiled.querySelectorAll('div')[0].textContent).toEqual('id: 1');
  });

  it('should render a div with "name: " as the text', () => {
    expect(compiled.querySelectorAll('div')[1].textContent).toEqual('name: ');
  });

  it('should render a input with "Windstorm" as the text', () => {
    expect(compiled.querySelector('input').value).toEqual('Windstorm');
  });

  it('should update the h2 text when the input value is changed', () => {
    const input: HTMLInputElement = compiled.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toEqual('TEST Details');
  });
});
