export class S3ObjectDto {
    constructor(s3Object) {
        this.s3Object = s3Object;
    }
    get url() {
        return this.s3Object.url;
    }
    setObject(s3Object) {
        this.s3Object = s3Object;
    }
}
