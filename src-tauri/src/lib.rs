// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
            Migration {
                version: 1,
                description: "create list table",
                sql: "CREATE TABLE IF NOT EXISTS lists (
                    list_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    list_name TEXT NOT NULL,
                    list_type TEXT CHECK( list_type IN ('B','C') ) NOT NULL DEFAULT 'B'
                )",
                kind: MigrationKind::Up,
            },
            Migration {
                version: 2,
                description: "create listitems table",
                sql: "CREATE TABLE IF NOT EXISTS listitems (
                    listitem_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    item_name TEXT NOT NULL,
                    list_id INTEGER,
                    FOREIGN KEY (list_id) REFERENCES lists(list_id)
                )",
                kind: MigrationKind::Up,
            }
        ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test.db", migrations)
                .build()
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
