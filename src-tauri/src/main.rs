#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod server;
use std::thread;

#[tauri::command]
fn addition(number1: u64, number2: u64) -> u64 {
return  number1+number2;
} 
#[tauri::command]
fn substraction(number1: u64, number2: u64) -> u64 {
return  number1-number2;
} 


fn main() {
    tauri::Builder::default()
        .setup(|app: &mut tauri::App| {
            let handle: tauri::AppHandle = app.handle();
            let boxed_handle: Box<tauri::AppHandle> = Box::new(handle);
            thread::spawn(move || {
                server::init(*boxed_handle).unwrap();
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![addition,substraction])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}