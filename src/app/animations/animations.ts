import { trigger, transition, style, animate } from '@angular/animations';
export let fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
    ]),
])
export let fadeOut = trigger('fadeOut', [
    transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
    ]),
])

