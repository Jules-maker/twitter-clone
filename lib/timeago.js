import TimeAgo from 'javascript-time-ago'
import fr from 'javascript-time-ago/locale/fr'

TimeAgo.addLocale(fr)

const timeago = new TimeAgo('fr-FR')

export default timeago