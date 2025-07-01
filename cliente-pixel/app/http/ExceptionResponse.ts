
export interface ErrorCode {
    code: string;
    desc: string;
}

export interface ValidationError {
    field: string;
    message: string;
}

export interface ExceptionResponse{
    timestamp: Date;
    message: string;
    details: string;
    errorCode: ErrorCode;
    validationErrors: ValidationError[]
}
