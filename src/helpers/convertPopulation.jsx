export const convertPopulationToMillions = (population) => {
    // Geeft het aantal miljoenen mensen weer, afgerond op 1 decimaal
    return (population / 1000000).toFixed(1);
};