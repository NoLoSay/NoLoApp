type HeaderAccept =
  | '*/*'
  | 'application/json'
  | 'text/plain'
  | 'text/html'
  | 'application/xml'
  | 'text/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
type HeaderContent =
  | '*/*'
  | 'application/json'
  | 'text/plain'
  | 'text/html'
  | 'application/xml'
  | 'text/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
interface Header {
  Accept: HeaderAccept
  'Content-Type': HeaderContent
}

interface PostProps {
  url: string
  headers?: Header
  body: any
}

const defaultHeaders: Header = {
  Accept: '*/*',
  'Content-Type': 'application/json',
}

export default async function post({ url, body, headers = defaultHeaders }: PostProps) {
  const options = {
    method: 'POST',
    headers,
    body,
  }
  console.log('post', url, options)
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: defaultHeaders.Accept,
      'Content-Type': defaultHeaders['Content-Type'],
    },
    body,
  })
    .then(response => {
      response.json().then(json => {
        console.log(json)
        return json
      })
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}
