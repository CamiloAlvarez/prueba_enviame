package fibonacci;
/**
 *
 * @author camilo
 */
public class Fibonacci {
    public static void main(String[] args) {
        //divisores(25);
        /*int res = fibonacci(12);
        System.out.println(res);
        System.out.println(divisores(res));*/
        System.out.println("Buscando numero fibonacci con mas de 1000 divisores...");
        int res = buscarNumero();
        System.out.println(res);
    }
    
    public static int buscarNumero(){
        int res = 0;
        int i = 13;
        while(res < 500){
            int num = fibonacci(i);
            int div = divisores(num);
            if(div >= 500){
                System.out.println(num);
                res = div;
                break;
            } else {
                i++;
            }
        }
        return res;
    }
    
    public static int divisores(int n){
        String div = "";
        int res = 0;
        for (int i=1;i<=n;i++){
            if (n%i == 0){
                div += i+",";
                res++;
            }
        }
        //System.out.println(div.substring(0,div.length()-1));
        return res;
    }
    
    public static int fibonacci(int n){
        int i0 = 0;
        int i1 = 1;
        int res = 0;
        for(int i=2;i<=n;i++){
            res = i0 + i1;
            if(i<n){
                i0 = i1;
                i1 = res;
            }
        }
        return res;
    }
}
