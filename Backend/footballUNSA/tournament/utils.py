from .models import Team

def generate_round_robin_fixtures():
    teams = list(Team.objects.all())
    fixtures = []

    if len(teams) < 2:
        return []

    if len(teams) % 2 != 0:
        teams.append(None)

    num_teams = len(teams)
    num_rounds = num_teams - 1
    
    for round_num in range(num_rounds):
        round_fixtures = []
        for i in range(num_teams // 2):
            team1 = teams[i]
            team2 = teams[num_teams - 1 - i]

            if team1 is not None and team2 is not None:
                round_fixtures.append((team1, team2))
        
        fixtures.append(round_fixtures)
        teams.insert(1, teams.pop())
    return fixtures