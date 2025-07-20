import { IncomingMessage } from "node:http"

export function getReqBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", chunk => {
      data += chunk
    })

    req.on("end", () => {
      try {
        resolve(JSON.parse(data))
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })

    req.on("error", err => {
      reject(err)
    })
  })
}
