const Alexa = require('ask-sdk-core');

// Handler para LaunchRequest
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido, esta es una calculadora desarrollada por: Aldair Yerena. ¿Qué operación deseas realizar?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué operación deseas realizar?')
            .getResponse();
    }
};

// Handler para CalcularIntent
const CalcularIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'calcular';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const operacion = slots.operacion.value;
        const primerNumero = parseFloat(slots.primer_numero.value);
        const segundoNumero = parseFloat(slots.segundo_numero.value);
        let resultado;
        let speakOutput;

        switch (operacion) {
            case 'sumar':
            case 'más':
                resultado = primerNumero + segundoNumero;
                speakOutput = `El resultado de sumar ${primerNumero} más ${segundoNumero} es ${resultado}`;
                break;
            case 'restar':
            case 'menos':
                resultado = primerNumero - segundoNumero;
                speakOutput = `El resultado de restar ${primerNumero} menos ${segundoNumero} es ${resultado}`;
                break;
            case 'multiplicar':
            case 'por':
                resultado = primerNumero * segundoNumero;
                speakOutput = `El resultado de multiplicar ${primerNumero} por ${segundoNumero} es ${resultado}`;
                break;
            case 'dividir':
            case 'entre':
                if (segundoNumero !== 0) {
                    resultado = primerNumero / segundoNumero;
                    speakOutput = `El resultado de dividir ${primerNumero} entre ${segundoNumero} es ${resultado}`;
                } else {
                    speakOutput = "No se puede dividir entre cero.";
                }
                break;
            case 'coseno':
                resultado = Math.cos(primerNumero);
                speakOutput = `El coseno de ${primerNumero} es ${resultado}`;
                break;
            case 'seno':
                resultado = Math.sin(primerNumero);
                speakOutput = `El seno de ${primerNumero} es ${resultado}`;
                break;
            case 'tangente':
                resultado = Math.tan(primerNumero);
                speakOutput = `La tangente de ${primerNumero} es ${resultado}`;
                break;
            case 'raiz':
                resultado = Math.sqrt(primerNumero);
                speakOutput = `La raíz cuadrada de ${primerNumero} es ${resultado}`;
                break;
            default:
                speakOutput = "Operación no reconocida. Por favor, inténtalo de nuevo.";
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Handler para HelloWorldIntent
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Handler para HelpIntent
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes pedirme que realice cálculos como suma, resta, multiplicación y división. ¿Cómo puedo ayudarte?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Handler para CancelIntent y StopIntent
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adiós!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Handler para FallbackIntent
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento, no entiendo esa solicitud. Por favor, inténtalo de nuevo.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Handler para SessionEndedRequest
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

// IntentReflectorHandler para reflejar los intents desconocidos
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de activar ${intentName}`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// ErrorHandler para capturar y manejar errores
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento, tuve problemas para hacer lo que pediste. Por favor, inténtalo de nuevo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Construcción del handler
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CalcularIntentHandler,  // Asegúrate de que este handler esté antes del IntentReflectorHandler
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler  // Este handler debe estar al final
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
