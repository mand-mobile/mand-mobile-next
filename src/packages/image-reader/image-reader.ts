/**
 * Read Image
 *
 * STATUS
 * 0: success
 * 100: 'browser does not support',
 * 101: 'picture size is beyond the preset',
 * 102: 'picture read failure',
 * 103: 'the number of pictures exceeds the limit'
 *
 */

export interface IOptions {
  files: FileList
  size: string | number
  complete: (option: any) => void
}

export interface ICompleteResult {
  errorCode: string | number
  errorMsg: string | number
  data: null | string
  file: File
}

export class CreateImageReader {
  files: FileList
  index: number
  size: IOptions['size']
  complete: IOptions['complete']

  constructor(options: IOptions) {
    const { files, size } = options

    this.files = files
    this.index = 0
    this.size = size || 0

    this.complete = options.complete
  }

  readImage() {
    this.start(this.files)
  }

  start(files: FileList) {
    ;(files as unknown as any[]).map((file: File) => {
      this.readFileContent(file)
    })
  }

  readFileContent(file: File) {
    if (this.size && file.size > this.size) {
      this.complete({
        errorCode: 101,
        errorMsg: `上传失败，您的图片超过最大值${this.size}kb`,
        file,
        data: null,
      })
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      this.complete({
        errorCode: 0,
        errorMsg: `上传成功`,
        file,
        data: reader.result,
      })
    }
    reader.onerror = () => {
      this.complete({
        errorCode: 102,
        errorMsg: `上传失败`,
        file,
        data: null,
      })
    }

    reader.readAsDataURL(file)
  }
}
