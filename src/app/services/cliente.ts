import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // Asegúrate de que esta ruta exista en C:/xampp/htdocs/uue_api/insertar_cliente.php
  private API_URL = 'http://localhost/insertarclientes/insertar_cliente.php';

  constructor(private http: HttpClient) { }

  guardar(cliente: any) {
    return this.http.post(this.API_URL, cliente);
    
  }
  private GET_URL = 'http://localhost/insertarclientes/consultar_clientes.php';

listarClientes() {
  return this.http.get<any[]>(this.GET_URL);
}
}