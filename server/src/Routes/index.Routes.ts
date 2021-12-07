import { Application,Request,Response } from 'express';
var jwt = require('jsonwebtoken');

export class initialRoutes{
    public initialRoutes(app: Application): void {
        app.route('/get').get((req:Request,res:Response)=>{
            res.send(jwt.sign({
                data: 'foobar'
              }, 'secret', { expiresIn: '1m' }))
        })
    }
}
