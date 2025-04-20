#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct ConnectPayload {
  db_type: String,
  host: String,
  port: u16,
  user: String,
  password: String,
  database: String,
}

#[derive(Serialize)]
struct TableList { tables: Vec<String> }

#[tauri::command]
async fn list_tables(p: ConnectPayload) -> Result<TableList, String> {
  // match p.db_type and use appropriate Rust crate (mysql_async, sqlx, mongodb, etc.)
  // connect and fetch table/view names
  Ok(TableList { tables: vec!["users".into(), "orders".into()] })
}

#[derive(Deserialize)]
struct TablePayload { db: ConnectPayload, table: String }

#[tauri::command]
async fn list_columns(p: TablePayload) -> Result<Vec<String>, String> {
  // connect and inspect column metadata
  Ok(vec!["id".into(), "name".into(), "created_at".into()])
}

#[derive(Deserialize)]
struct CodeGenPayload { db: ConnectPayload, table: String, columns: Vec<String> }

#[derive(Serialize)]
struct CodeResult { code: String }

#[tauri::command]
fn generate_code(p: CodeGenPayload) -> CodeResult {
  // build Python FastAPI CRUD code using p.table and p.columns
  let code = format!(r#"from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
{}

@app.post('/{table}/')
def create_item(item: Item):
    ...
"#, /* fill model fields */ table=p.table );
  CodeResult { code }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![list_tables, list_columns, generate_code])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}