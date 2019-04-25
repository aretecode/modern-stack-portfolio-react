/**
 * @api @see https://danger.systems/js/
 *
 * @example https://github.com/apollographql/apollo-client/blob/master/config/dangerfile.ts
 */
import { message, danger } from 'danger'

const modifiedMD = danger.git.modified_files.join('- ')
message('Changed Files in this PR: \n - ' + modifiedMD)
