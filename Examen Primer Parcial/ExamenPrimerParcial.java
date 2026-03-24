import java.util.Scanner;

public class ExamenPrimerParcial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String entrada;
        int opcion;

        do {
            System.out.println("\n--- SISTEMA DE COTIZACIÓN DE PISOS ---");
            System.out.println("1. Opción A - Porcelanato/Laminado ($13.45 x m2)");
            System.out.println("2. Opción B - Marmolado ($43.95 x m2)");
            System.out.println("3. Opción C - Acrílico ($39.24 x m2)");
            System.out.println("4. Salir");
            System.out.print("Seleccione una opción: ");

            entrada = scanner.nextLine();

            if (!entrada.matches("[1-4]")) {
                System.out.println("[ERROR]: Debe ingresar el NÚMERO de la opción (1-4).");
                continue;
            }

            opcion = Integer.parseInt(entrada);

            if (opcion == 4) {
                System.out.println("Saliendo del sistema...");
                break;
            }

            String nombre;
            do {
                System.out.print("Ingrese nombre completo (mínimo 10 letras y al menos un espacio): ");
                nombre = scanner.nextLine();
                if (nombre.length() < 10 || !nombre.contains(" ")) {
                    System.out.println("[ERROR]: Debe ingresar nombre y apellido con al menos 10 caracteres.");
                }
            } while (nombre.length() < 10 || !nombre.contains(" "));

            double ancho;
            while (true) {
                System.out.print("Ancho del piso (metros): ");
                entrada = scanner.nextLine();
                try {
                    ancho = Double.parseDouble(entrada);
                    if (ancho <= 0)
                        throw new Exception();
                    break;
                } catch (Exception e) {
                    System.out.println("[ERROR]: Ingrese un número válido mayor a 0.");
                }
            }

            double largo;
            while (true) {
                System.out.print("Largo del piso (metros): ");
                entrada = scanner.nextLine();
                try {
                    largo = Double.parseDouble(entrada);
                    if (largo <= 0)
                        throw new Exception();
                    break;
                } catch (Exception e) {
                    System.out.println("[ERROR]: Ingrese un número válido mayor a 0.");
                }
            }

            double precio = 0;
            if (opcion == 1)
                precio = 13.45;
            if (opcion == 2)
                precio = 43.95;
            if (opcion == 3)
                precio = 39.24;

            double area = ancho * largo;
            double subtotal = area * precio;
            double totalIVA = subtotal * 1.16;

            System.out.println("\n--- RESULTADO ---");
            System.out.println("Cliente: " + nombre);
            System.out.printf("Área: %.2f m2 | Costo con IVA (16%%): $%.2f\n", area, totalIVA);

            String confirmacion;
            do {
                System.out.print("¿Confirma la compra para aplicar descuento del 7.25%? (SI/NO): ");
                confirmacion = scanner.nextLine().toUpperCase();
                if (!confirmacion.equals("SI") && !confirmacion.equals("NO")) {
                    System.out.println("[ERROR]: Responda únicamente SI o NO.");
                }
            } while (!confirmacion.equals("SI") && !confirmacion.equals("NO"));

            if (confirmacion.equals("SI")) {
                double descuento = totalIVA * 0.0725;
                double totalFinal = totalIVA - descuento;

                System.out.println("\n--- TICKET DE VENTA ---");
                System.out.printf("Descuento aplicado: $%.2f\n", descuento);
                System.out.printf("TOTAL FINAL A PAGAR: $%.2f\n", totalFinal);
            }

        } while (true);

        scanner.close();
    }
}