import { useContext } from 'react';
import { cyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
  const { cycles } = useContext(cyclesContext);
  console.log(cycles);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      {/* <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre> */}

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>
                  {`${cycle.minutesAmount} minutos`}
                </td>
                <td>{cycle.startDate.toLocaleDateString()}</td>
                <td>
                  { cycle.finishedDate && (
                  <Status statusColor="green">Concluído</Status>
                  )}

                  { cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}

                  {!cycle.finishedDate && !cycle.interruptedDate && <Status statusColor="yellow">Em andamento</Status>}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
