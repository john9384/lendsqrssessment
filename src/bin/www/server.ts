// import http from 'http'
import config from '../../config'
import { Logger } from '../../library/helpers'
import Application from '../../app'
import ConnectDatabase from '../../db/connectDB'

const app = Application()

ConnectDatabase().catch(err => Logger.error(err))

app.listen(config.app.PORT || 4000, () => {
	Logger.info(`
  -------------------------------------------
    ${config.app.NAME?.toUpperCase()} Server listening on port ${
		config.app.PORT || 4000
	}
  -------------------------------------------
  `)
})
