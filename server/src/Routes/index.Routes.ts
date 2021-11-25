import { Application } from 'express';

export class initialRoutes{
    public initialRoutes(app: Application): void {
        app.route('/get').get(()=>{
            console.log("helloe")
        })
    }
}