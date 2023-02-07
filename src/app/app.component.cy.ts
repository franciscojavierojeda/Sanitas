import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should display the title of the app', () => {
        cy.get('[data-test=title]').should('exist');
    });

    it('should display a list of tests', () => {
        cy.get('[data-test=test-list]').should('exist');
    });
});
