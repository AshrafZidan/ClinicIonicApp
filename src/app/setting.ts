import { Headers, RequestOptions } from '@angular/http';
import { sessionData } from '../pages/shared/session-data'

export class setting {


    
    public static APP_NAME: string = "Oreo";
    public static APP_UI_NAME: string = "Qatar Sales";
    public static version = "1.0";
    public static DOMAIN_URL="http://localhost:8080/Oreo";

    static getHeaderJson(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');
        return contentHeaders;
    }
    static getHeaderJsonWithTKN(): Headers {

        let contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;
    }


    static getHeaderXWFORM(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        return contentHeaders;
    }




    static getHeaderJsonWithTKNImgeUpload(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        // contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;
    }

    static getHeaderXWFORMWithTkn(): Headers {
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        // contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;
    }

    static getHeaderTKN(): Headers {
        let contentHeaders = new Headers();
        // contentHeaders.append('tkn', sessionData.userToken);
        return contentHeaders;

    }

}