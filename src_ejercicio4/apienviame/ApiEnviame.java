package apienviame;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class ApiEnviame {

	private static final String POST_URL = "https://stage.api.enviame.io/api/s2/v2/companies/401/deliveries";

	public static void main(String[] args) throws IOException {

		//sendGET();
		//System.out.println("GET DONE");
                String body = "{\n" +
"    \"shipping_order\": {\n" +
"        \"n_packages\": \"1\",\n" +
"        \"content_description\": \"ORDEN 255826267\",\n" +
"        \"imported_id\": \"255826267\",\n" +
"        \"order_price\": \"24509.0\",\n" +
"        \"weight\": \"0.98\",\n" +
"        \"volume\": \"1.0\",\n" +
"        \"type\": \"delivery\"\n" +
"    },\n" +
"    \"shipping_origin\": {\n" +
"        \"warehouse_code\": \"401\"\n" +
"    },\n" +
"    \"shipping_destination\": {\n" +
"        \"customer\": {\n" +
"            \"name\": \"Bernardita Tapia Riquelme\",\n" +
"            \"email\": \"b.tapia@outlook.com\",\n" +
"            \"phone\": \"977623070\"\n" +
"        },\n" +
"        \"delivery_address\": {\n" +
"            \"home_address\": {\n" +
"                \"place\": \"Puente Alto\",\n" +
"                \"full_address\": \"SAN HUGO 01324, Puente Alto, Puente Alto\"\n" +
"            }\n" +
"        }\n" +
"    },\n" +
"    \"carrier\": {\n" +
"        \"carrier_code\": \"\",\n" +
"        \"tracking_number\": \"\"\n" +
"    }\n" +
"}";
		sendPOST(body);
		System.out.println("POST DONE");
	}

	private static void sendPOST(String body) throws IOException {
		URL obj = new URL(POST_URL);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept", "application/json");
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("api-key", "ea670047974b650bbcba5dd759baf1ed");

		// For POST only - START
		con.setDoOutput(true);
		OutputStream os = con.getOutputStream();
                byte[] input = body.getBytes("utf-8");
                os.write(input, 0, input.length);	
		//os.write(body.getBytes());
		os.flush();
		os.close();
		// For POST only - END

		int responseCode = con.getResponseCode();
		System.out.println("POST Response Code :: " + responseCode);

		if (responseCode == HttpURLConnection.HTTP_OK || responseCode == 201) { //success
			BufferedReader in = new BufferedReader(new InputStreamReader(
					con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			// print result
                        String str = response.toString();
                        System.out.println(str);
                        FileOutputStream outputStream = new FileOutputStream("response.json");
                        byte[] strToBytes = str.getBytes();
                        outputStream.write(strToBytes);

                        outputStream.close();
		} else {
			System.out.println("POST request not worked");
		}
	}

}