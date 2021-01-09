UPDATE employees e INNER JOIN countries c ON e.country_id = c.id INNER JOIN
continents cn ON c.continent_id = cn.id SET e.salary =
e.salary+cn.anual_adjustment WHERE e.salary <= 5000;