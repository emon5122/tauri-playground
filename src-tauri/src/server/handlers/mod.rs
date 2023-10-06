use actix_web::{get, post, HttpResponse, Responder};

#[get("/")]
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Emon")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[get("/post")]
async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}
