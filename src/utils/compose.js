/**
 * 
 * compose получает массив функций и возвращает функцию, в которую передаем компонент (например, BookList)
 * Этот компонент будет являтся первым элементом в функции reduceRight (проходит по массиву и выполняет функции справа-налево)
 * [f1, f2, f3].reduceRight(
 *  (wrapped=comp, currentFunction=f1) => f1(comp), потом f2(f1), потом f3(f2)
 * comp)
 * 
 */

const compose = (...funcs) => (comp) => {
    return funcs.reduceRight(
        (wrapped, currentFucntion) => currentFucntion(wrapped), comp )
} 

export default compose