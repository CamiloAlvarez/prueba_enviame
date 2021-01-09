package tiempoentrega;

import java.util.Scanner;

/**
 *
 * @author camilo
 */
public class TiempoEntrega {
    public static void main(String[] args) {
        String rangos = "";
        System.out.println("Ingrese numero de rango a calcular:3");
        Scanner entradaEscaner = new Scanner (System.in);
        rangos = entradaEscaner.nextLine ();
        int rango = Integer.parseInt(rangos);
        int dias = entrega(rango);
        System.out.println("Rango "+(rango+1)+": menos de "+(rango+1)*100+" km, entrega en "+dias+" dias");
    }
    
    public static int entrega(int rango){
        int i0 = 0;
        int i1 = 1;
        if(rango == 0) return i0;
        if(rango == 1) return i1;
        int res = 0;
        for(int i=2;i<=rango;i++){
            res = i0 + i1;
            if(i<rango){
                i0 = i1;
                i1 = res;
            }
        }
        return res;
    }
}
