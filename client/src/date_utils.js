import moment from 'moment'
import momentTZ from 'moment-timezone'

export const DISPLAY_FORMAT = 'M/D/YYYY h:mm:ss a'

export function formatDate(subject, displayFmt = DISPLAY_FORMAT) {
  const parseFormats = [
    'YYYY-MM-DD hh:mm:ss',
    'M/D/YYYY h:mm a',
    'DD-MM-YYYY hh:mm:ss',
    'DD-MMM-YYYY hh:mm:ss'
  ]

  const validFormats = parseFormats.filter(format => {
    return moment([subject], format).isValid()
  })

  return validFormats.length ? moment([subject], validFormats[0]).format(displayFmt) : ''
}

export function toLocalDateTime (utcTime) {
  if (utcTime == '') return ''

	const localTime = moment.utc(utcTime, DISPLAY_FORMAT).toDate()

	return moment(localTime, DISPLAY_FORMAT).format(DISPLAY_FORMAT)
}

export function toLocalFromDateTimez(str, timeZone) {
  if (!str) return null

  const time = momentTZ.tz(str.substr(0, 19), timeZone)

  return time.local().format(DISPLAY_FORMAT) 
}