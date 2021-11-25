import { Application } from 'express';
var jwt = require('jsonwebtoken');

export class initialRoutes{
    public initialRoutes(app: Application): void {
        app.route('/get').get(()=>{
            console.log("routes",jwt.sign({
                data: 'foobar'
              }, 'secret', { expiresIn: '1m' }))
            return jwt.sign({
                data: 'foobar'
              }, 'secret', { expiresIn: '30m' })
        })
    }
}