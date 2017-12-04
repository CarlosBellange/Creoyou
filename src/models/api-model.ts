
//model for AI obserable

export interface Studentdegree {

  id: string,
  degree_name: string,

}

export interface postQuestion {

  success: boolean,
  msg: string,

}

export interface commonStatus {

  status: boolean,
  msg: string,

}

export interface chathistory {

  chaths: any,

}
export interface tutorList {
  id: number,
  name: string,
  user_image: string,
  featured_tutor: number,
  degree_name: string

}

export interface myQuestionList {
  success: boolean,
  msg: string,
  data: any;
}

export interface common {
  status: any,
  msg: string,
  data: any

}
export interface common33 {
  success: any,
  message: string,
  data: any

}
export interface common2 {
  status: any,
  msg: string,
  hired_status: string,
  data: any

}
export interface login {
  id: number,
  degree_id: number,
  name: string,
  username: string,
  email: string
  mobile_code: any,
  mobile_no: any,
  url_code: any,
  security_code: any,
  password: any,
  user_image: any,
  about: any,
  status: any,
  profile_viewed: any,
  profile_updated: any,
  creation_date: any,
  updation_date: any,
  student: any,
}


export interface studentReg {

}

export interface contact {
  success: boolean,
  msg: string,
  security_code: number,
  email: string
}

export interface forgotPassword {
  success: boolean,
  msg: string,
  user_type: string
}
export interface mycommonresponse {

  success: any;
  status_message: any;
}
export interface mycommonresponsedata {

  success: any;
  message: any;
  data: any;
}
