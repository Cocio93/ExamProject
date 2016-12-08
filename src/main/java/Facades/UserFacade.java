package Facades;

import Entities.RegisteredUser;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

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
}
