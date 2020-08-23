import locations from '../mocks/estados.json';

class StatesController {
  list(_, res) {
    const states = locations.map((state) => ({
      label: state.nome,
      value: state.sigla,
      cities: state.cidades.map((city) => ({
        label: city,
        value: city,
      })),
    }));
    return res.status(200).json(states);
  }
}

export default new StatesController();
