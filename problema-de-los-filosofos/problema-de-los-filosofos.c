#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>
#include <unistd.h>

#define NUMBER_OF_PHILOSOPHERS 5

sem_t chopsticks[NUMBER_OF_PHILOSOPHERS];

void* philosopher(void* num) {
    int id = *(int*)num;

    while (1) {
        printf("Philosopher %d is thinking...\n", id);
        sleep(1);

        if (id == NUMBER_OF_PHILOSOPHERS - 1) {
            sem_wait(&chopsticks[(id + 1) % NUMBER_OF_PHILOSOPHERS]);
            sem_wait(&chopsticks[id]);
        } else {
            sem_wait(&chopsticks[id]);
            sem_wait(&chopsticks[(id + 1) % NUMBER_OF_PHILOSOPHERS]);
        }

        printf("Philosopher %d is EATING.\n", id);
        sleep(2);

        sem_post(&chopsticks[id]);
        sem_post(&chopsticks[(id + 1) % NUMBER_OF_PHILOSOPHERS]);

        printf("Philosopher %d finished eating and dropped chopsticks.\n", id);
    }
}

int main() {
    pthread_t threads[NUMBER_OF_PHILOSOPHERS];
    int ids[NUMBER_OF_PHILOSOPHERS];

    for (int i = 0; i < NUMBER_OF_PHILOSOPHERS; i++) {
        sem_init(&chopsticks[i], 0, 1);
        ids[i] = i;
    }

    for (int i = 0; i < NUMBER_OF_PHILOSOPHERS; i++) {
        pthread_create(&threads[i], NULL, philosopher, &ids[i]);
    }

    for (int i = 0; i < NUMBER_OF_PHILOSOPHERS; i++) {
        pthread_join(threads[i], NULL);
    }

    return 0;
}