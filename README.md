# schedule-common
This is schedule service repository.

# flows
## Legend:
* Customer - user with type 'customer'
* Provider - user with type 'provider'

## Fulfillment (No cash)
1. Customer creates schedule if available (**Sync**)
    1. Service publishes `schedule/created` event (consumers: payment service (authorise?), notification service (notify Provider?))
2. Schedule submits after Provider's approve
    1. Schedule info update (state to `Submitted`)
    2. Service publishes `schedule/submitted` event (consumers: notification service (notify Customer))
3. Payment service publishes `payment/authorise-succeeded` event
    1. Schedule info update (payment)
4. Provider completes schedule record (**Sync**)
    1. Schedule info update (state to `Completed`)
    1. Service publishes `schedule/completed` event (consumers: payment service (capture))
5. Payment service publishes `payment/capture-succeeded` event
    1. Schedule info update (state to `Fulfilled`)
    2. Service publishes `schedule/fulfilled` event (consumers: none)
## Fulfillment (Cash)
1. Customer creates schedule if available (**Sync**)
    1. Service publishes `schedule/created` event (consumers: notification service (notify Provider?))
2. Schedule submits after Provider's approve
    1. Schedule info update (state to `Submitted`)
    2. Service publishes `schedule/submitted` event (consumers: notification service (notify Customer))
3. Provider completes schedule record (**Sync**)
    1. Schedule info update (state to `Fulfilled`)
    2. Service publishes `schedule/fulfilled` event (consumers: none)

## Payment authorisation failed
## Payment refund

# handlers
## create schedule
Creates schedule record
## cancel schedule
Cancels schedule record


