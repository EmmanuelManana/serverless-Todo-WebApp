import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'
import { createLogger } from '../utils/logger'

const logger = createLogger('JWT')
/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}

export function getToken(authHeader: string) {
  if (!authHeader) throw new Error('No authorisation header')

  if (!authHeader.toLocaleLowerCase().startsWith('bearer '))
    throw new Error('Invalid authorisation header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

export function getUserIdFromHeader(authHeader: string) {
  const token = parseUserId(getToken(authHeader))
  logger.info('User JWT Token decoded: ', token)
  return token
}
