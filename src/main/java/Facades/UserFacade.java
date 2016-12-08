package Facades;

import Entities.RegisteredUser;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

/**
 *
 * @author John
 */
public class UserFacade {

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("persistence");
    EntityManager em = emf.createEntityManager();

    public void createUser(String firstName, String lastName, String userName, String password) {
        RegisteredUser user = new RegisteredUser(firstName, lastName, userName, password);

        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        em.close();

    }

    public boolean login(String userName, String password) {
        boolean result  = false;
        em.getTransaction().begin();
        Query q = em.createQuery("SELECT u FROM RegisteredUser u WHERE u.userName=:userName", RegisteredUser.class)
                .setParameter("userName", userName);
        List<RegisteredUser> users = q.getResultList();
        em.close();

        
        if (!users.isEmpty()) {
            RegisteredUser user = users.get(0);
            if (user.getPassword().equals(password)) {
                result = true;
            }         
        } else {
            result = false;
        }
        
        System.out.println("User Exists?: " + result);
        return result;
    }

}
