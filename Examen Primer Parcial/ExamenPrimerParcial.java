import java.util.Scanner;

public class ExamenPrimerParcial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String entrada;
        int opcion = 0;

        do {
            System.out.println("\n--- SISTEMA DE COTIZACIÓN DE PISOS ---");
            System.out.println("1. Opción A - Porcelanato/Laminado ($13.45 x m2)");
            System.out.println("2. Opción B - Marmolado ($43.95 x m2)");
            System.out.println("3. Opción C - Acrílico ($39.24 x m2)");
            System.out.println("4. Salir");
            System.out.print("Seleccione una opción: ");

            entrada = scanner.nextLine();
            try {
                opcion = Integer.parseInt(entrada);
            } catch (NumberFormatException e) {
                System.out.println("\n[ERROR]: Debe ingresar el NÚMERO de la opción (1-4).");
                continue;
            }

            if (opcion >= 1 && opcion <= 3) {
                double precioPorMetro = (opcion == 1) ? 13.45 : (opcion == 2) ? 43.95 : 39.24;

                // Validación del nombre (Mínimo 10 caracteres)
                String nombre = "";
                while (nombre.length() < 10) {
                    System.out.print("Ingrese nombre completo (mínimo 10 letras): ");
                    nombre = scanner.nextLine();
                    if (nombre.length() < 10) {
                        System.out.println("[ERROR]: El nombre debe tener al menos 10 caracteres.");
                    }
                }

                // Validación de ANCHO (No permite letras)
                double ancho = -1;
                while (ancho <= 0) {
                    System.out.print("Ancho del piso (metros): ");
                    try {
                        ancho = Double.parseDouble(scanner.nextLine());
                        if (ancho <= 0)
                            System.out.println("[ERROR]: La medida debe ser mayor a 0.");
                    } catch (NumberFormatException e) {
                        System.out.println("[ERROR]: Solo se permiten números para las medidas.");
                    }
                }

                // Validación de LARGO (No permite letras)
                double largo = -1;
                while (largo <= 0) {
                    System.out.print("Largo del piso (metros): ");
                    try {
                        largo = Double.parseDouble(scanner.nextLine());
                        if (largo <= 0)
                            System.out.println("[ERROR]: La medida debe ser mayor a 0.");
                    } catch (NumberFormatException e) {
                        System.out.println("[ERROR]: Solo se permiten números para las medidas.");
                    }
                }

                double area = ancho * largo;
                double subtotal = area * precioPorMetro;
                double impuestos = subtotal * 0.16;
                double totalCotizacion = subtotal + impuestos;

                System.out.println("\n--- RESULTADO ---");
                System.out.println("Cliente: " + nombre);
                System.out.printf("Área: %.2f m2 | Costo con IVA (16%%): $%.2f\n", area, totalCotizacion);

                // Validación de SI/NO
                System.out.print("\n¿Confirma la compra para aplicar descuento del 7.25%? (SI/NO): ");
                String confirma = scanner.nextLine().trim().toUpperCase();

                if (confirma.equals("SI") || confirma.equals("S")) {
                    double descuento = subtotal * 0.0725;
                    double subtotalConDesc = subtotal - descuento;
                    double totalFinal = subtotalConDesc + (subtotalConDesc * 0.16);

                    System.out.println("\n--- TICKET DE VENTA ---");
                    System.out.printf("Descuento aplicado: -$%.2f\n", descuento);
                    System.out.printf("TOTAL FINAL A PAGAR: $%.2f\n", totalFinal);
                } else {
                    System.out.println("Cotización guardada sin descuento.");
                }

            } else if (opcion != 4) {
                System.out.println("Opción no válida.");
            }

        } while (opcion != 4);

        System.out.println("Cerrando programa...");
        scanner.close();
    }
}