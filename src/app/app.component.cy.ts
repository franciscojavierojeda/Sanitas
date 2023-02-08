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

    /*Test para comprobación de título principal de la aplicación */
    it('Debería desplegar el título de la aplicación', () => {
        cy.get('[data-test=title]').should('exist');
    });

    /*Chequeo de conjunto de datos de la tabla */
    it('Debería tener una lista de tests', () => {
        cy.get('.test-container--table')
            .should('have.length.greaterThan', 0);
    });
    /*Comprobación del input de búsqueda de datos */
    it('Debería tener un input para buscar', () => {
        cy.get('.test-container--table--search--text')
            .should('be.visible')
            .and('have.attr', 'type', 'text');
    });

    /*Test para visualización del filtrado de datos por id o texto */
    it('Debería filtrar los tests por id o texto', () => {
        cy.get('.test-container--table--search--text')
            .type('asd')
            .should('have.value', 'asd');

        cy.get('.test-container--table tbody tr')
            .should('have.length.lessThan', 4000);
    });
});
