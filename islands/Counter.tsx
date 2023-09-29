import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/compat";
import Shepherd from "https://esm.sh/shepherd.js@11.2.0?target=es2022";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  
  // Función que se ejecutará después del montaje del componente
  const setupAfterMount = () => {
    // Coloca tu lógica personalizada aquí
    console.log("El componente Counter se ha montado completamente.");
    
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        scrollTo: true
      }
    });
    tour.addSteps(
      [
        {
          id: 'example-step-1',
          text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
          classes: 'example-step-extra-class',
          buttons: [
              {
                text: 'Next',
                action: tour.next
              }
          ]
        },
        {
          id: 'example-step-2',
          text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
          attachTo: {
            element: '.example-css-selector',
            on: 'bottom'
          },
          classes: 'example-step-extra-class',
          buttons: [
            {
              text: 'Next',
              action: tour.next
            }
          ]
        },
        {
          id: 'example-step-3',
          text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
          advanceOn: { selector: '.example-css-selector-2', event: 'click' },
          attachTo: {
            element: '.example-css-selector-2',
            on: 'bottom'
          },
          classes: 'example-step-extra-class',
        }
      ]
    )

    tour.start();

    // tour.show('example-step-3')

  };

  // Utiliza useEffect para ejecutar setupAfterMount después del montaje
  useEffect(() => {
    setupAfterMount();
  }, []); // El segundo argumento es un arreglo vacío para que se ejecute solo una vez después del montaje



  return (
    <div class="flex gap-8 py-6 example-css-selector p-2">
      <Button onClick={() => props.count.value -= 1}>-1</Button>
      <p class="text-3xl">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>+1</Button>
    </div>
  );
}
