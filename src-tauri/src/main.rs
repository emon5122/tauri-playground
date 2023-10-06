#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tauri::command]
fn addition(number1: u64, number2: u64) -> u64 {
return  number1+number2;
} 

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![addition])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
