import { Component, OnInit } from '@angular/core'; // 1. OnInit debe estar aquí
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from './services/cliente'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit { // 2. Una sola declaración de clase
  formCliente: FormGroup;
  listaClientes: any[] = []; // 3. La lista de clientes vive aquí

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.formCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  // 4. Se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.obtenerClientes();
  }

 obtenerClientes() {
  this.clienteService.listarClientes().subscribe({
    next: (res) => {
      this.listaClientes = res; // Actualiza la lista con los nuevos datos de MySQL
    },
    error: (err) => console.error('Error al obtener clientes:', err)
  });
}

 enviar() {
  if (this.formCliente.valid) {
    this.clienteService.guardar(this.formCliente.value).subscribe({
      next: (res: any) => {
        alert('¡Cliente guardado con éxito!');
        this.formCliente.reset(); // 1. Limpia el formulario
        this.obtenerClientes();   // 2. RECARGA LA TABLA SIN REFRESCAR LA PÁGINA
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      }
    });
  }
}
}