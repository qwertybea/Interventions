import { IType } from "./type";
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TypeData implements InMemoryDbService {
    createDb() {
        let types: IType [] = [
            {
                'id': 1,
                'descriptionTypeProbleme': 'Problème avec la souris'
            },
            {
                'id': 2,
                'descriptionTypeProbleme': 'Problème de clavier'
            },
            {
                'id': 3,
                'descriptionTypeProbleme': 'Problème d\'accès Internet'
            },
            {
                'id': 4,
                'descriptionTypeProbleme': 'Problème avec un logiciel'
            },
            {
                'id': 5,
                'descriptionTypeProbleme': 'Problème d\'imprimante'
            },
            {
                'id': 6,
                'descriptionTypeProbleme': 'Carte graphique'
            }, {
                'id': 7,
                'descriptionTypeProbleme': 'Carte mère'
            }, {
                'id': 8,
                'descriptionTypeProbleme': 'Autre'
            }
        ];
        return {types};
    }
}