import http from 'http'
import config from '../../config'
import { Logger } from '../../library/helpers'
import Application from '../../app'
import ConnectDatabase from '../../db/connectDB'

const PORT = config.app.PORT || 4000
const app = Application()

ConnectDatabase()
	.then(() => {})
	.catch(err => Logger.error(err))

new http.Server(app).listen(PORT, () => {
	Logger.info(`
  -------------------------------------------
    ${config.app.NAME?.toUpperCase()} Server listening on port ${PORT}
  -------------------------------------------
  `)
})
