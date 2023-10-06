mod handlers;

use std::sync::Mutex;
use actix_web::{middleware, web, App, HttpServer};
use actix_cors::Cors;
use tauri::AppHandle;

#[allow(dead_code)]
struct TauriAppState {
    app: Mutex<AppHandle>,
}

#[actix_web::main]
pub async fn init(app: AppHandle) -> std::io::Result<()> {
    let tauri_app: web::Data<TauriAppState> = web::Data::new(TauriAppState {
        app: Mutex::new(app),
    });
    HttpServer::new(move || {
        App::new()
            .app_data(tauri_app.clone())
            .wrap(middleware::Logger::default())
            .wrap(Cors::permissive())
            .service(handlers::hello)
    })
    .bind(("127.0.0.1", 4875))?
    .run()
    .await
}