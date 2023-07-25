import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

export default async function getPredictionUTE(input: { queries: string[]; responses: string[] }) {
  console.log('Using TensorFlow backend: ', tf.getBackend());

  // Calculate the dot product of two vector arrays.
  const dotProduct = (xs: any, ys: any) => {
    const sum = (xs: any) =>
      xs ? xs.reduce((a: any, b: any) => a + b, 0) : undefined;

    return xs.length === ys.length
      ? sum(zipWith((a: any, b: any) => a * b, xs, ys))
      : undefined;
  };

  // zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
  const zipWith = (f: any, xs: any, ys: any) => {
    const ny = ys.length;
    return (xs.length <= ny ? xs : xs.slice(0, ny)).map((x: any, i: any) =>
      f(x, ys[i])
    );
  };

  // Load the model.
  return use.loadQnA().then((model) => {
    /*
      Embed a dictionary of a query and responses. The input to the embed method
      needs to be in following format:
      {
        queries: string[];
        responses: Response[];
      }
      queries is an array of question strings
      responses is an array of following structure:
      {
        response: string;
        context?: string;
      }
      context is optional, it provides the context string of the answer.
    */
    let scores: any = [];
    const embeddings = model.embed(input);
    /*
      The output of the embed method is an object with two keys:
      {
        queryEmbedding: tf.Tensor;
        responseEmbedding: tf.Tensor;
      }
      queryEmbedding is a tensor containing embeddings for all queries.
      responseEmbedding is a tensor containing embeddings for all answers.
      You can call `arraySync()` to retrieve the values of the tensor.
      In this example, embed_query[0] is the embedding for the query
      'How are you feeling today?'
      And embed_responses[0] is the embedding for the answer
      'I\'m not feeling very well.'
    */
    const embed_query: any = embeddings["queryEmbedding"].arraySync();
    const embed_responses: any = embeddings["responseEmbedding"].arraySync();
    // compute the dotProduct of each query and response pair.
    for (let i = 0; i < input["queries"].length; i++) {
      for (let j = 0; j < input["responses"].length; j++) {
        scores.push(dotProduct(embed_query[i], embed_responses[j]));
      }
    }
    
    return scores;
  });
}
