import os
import glob

replacements = {
    'â€”': '—',
    'â˜…': '★',
    'ðŸª‘': '🪑',
    'â€¦': '…',
    'â€“': '–',
    'â ¤ï¸ ': '❤️',
    'â€™': '’'
}

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for bad, good in replacements.items():
        if bad in content:
            content = content.replace(bad, good)
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed encoding in {filepath}')
