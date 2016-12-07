/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Facades;

import Entities.ReservationRequest;
import Entities.ReservationRequestNoURL;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 *
 * @author John
 */
public class ReservationFacade {

    public ReservationFacade() {

    }

    public String sendRequest(ReservationRequest request) throws MalformedURLException, IOException {
        Gson gson = new Gson();

        ReservationRequestNoURL finalRequest = new ReservationRequestNoURL(
        request.getFlightID(), request.getNumberOfSeats(), request.getReserveeName(),
        request.getReservePhone(), request.getReserveeEmail(), request.getPassengers());
        // This is the proper protocol. Gets implemented when other APIs are deployed.
        // URL url = new URL(request.getBaseUrl() + "/reservation/" + request.getFlightID());
        URL url = new URL(request.getBaseUrl() + "/flightreservation/");
          
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(5000);
        connection.setReadTimeout(5000);

        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "application/json");

        OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
        out.write(gson.toJson(finalRequest));
        out.flush();
        out.close();

        int res = connection.getResponseCode();

        System.out.println(res);

        InputStream is = connection.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line = null;
        String json = "";
        while ((line = br.readLine()) != null) {
            System.out.println(line);
            json += line;
        }
        connection.disconnect();
        
        return json;
    }
}
